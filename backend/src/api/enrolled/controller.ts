import { Request, Response } from "express";
import { classesCollection, enrolledCollection, userCollections } from "../../config/database";

export const getEnrolledClasses = async (req: Request, res: Response) => {
    try {
        const result = await classesCollection.find().sort({ totalEnrolled: -1 }).limit(6).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getEnrolledInstructors = async (req: Request, res: Response) => {
    try {
        const pipeline = [
            {
                $match: { role: 'instructor' }  
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: 'email',
                    foreignField: 'instructorEmail',
                    as: 'enrollments'
                }
            },
            {
                $project: {
                    _id: 0, 
                    totalEnrolled: { 
                        $ifNull: [{ $sum: "$enrollments.totalEnrolled" }, 0]  
                    },
                    instructor: {  
                        _id: "$_id",
                        name: "$name",
                        email: "$email",
                        photoUrl: "$photoUrl",
                        gender: "$gender",
                        address: "$address",
                        role: "$role",
                        phone: "$phone",
                        about: "$about",
                        skills: "$skills"
                    }
                }
            },
            {
                $sort: { totalEnrolled: -1 }  
            },
            {
                $limit: 6 
            }
        ];

        const result = await userCollections.aggregate(pipeline).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
};

export const getAdminStatus = async (req: Request, res: Response) => {
    try {
        const approvedClasses = (await (classesCollection.find({ status: 'approved' }).toArray())).length;
        const pendingClasses = (await (classesCollection.find({ status: 'pending' }).toArray())).length;
        const instructors = (await (userCollections.find({ role: 'instructor' }).toArray())).length;
        const totalClasses = (await classesCollection.find().toArray()).length;
        const totalEnrolled = (await enrolledCollection.find().toArray()).length;

        const result = {
            approvedClasses,
            pendingClasses,
            instructors,
            totalClasses,
            totalEnrolled
        }

        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getAllInstructors = async (req: Request, res: Response) => {
    try {
        const result = await userCollections.find({ role: 'instructor' }).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getEnrolledClassesByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const query = { userEmail: email };
        const pipeline = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: 'classesId',
                    foreignField: '_id',
                    as: 'class'
                }
            },
            {
                $unwind: '$classes'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'classes.instructorEmail',
                    foreignField: 'email',
                    as: 'instructor'
                }
            },
            {
                $project: {
                    _id: 0,
                    instructor: {
                        $arrayElemAt: ['$instructor', 0]
                    },
                    classes: 1
                }
            }
        ];

        const result = await enrolledCollection.aggregate(pipeline).toArray();

        res.send(result);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
}

