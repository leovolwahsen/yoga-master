export interface IOutletContext {
    isDarkMode: boolean
}

export interface INavbarProps {
    isDarkMode: boolean
    setIsDarkMode: (value: boolean) => void
}

export interface IFooterProps {
    isDarkMode: boolean
}

export interface IClassItem {
    _id: string
    name: string
    image: string
    availableSeats: number
    price: number
    videoLink: string
    description: string
    instructorName: string
    instructorEmail: string
    status: string
    submitted: string
    totalEnrolled: number
    reason: string | null
   
}

export interface IPopularInstructor {
    totalEnrolled: number
    instructor: {
        _id: string
        name: string
        email: string
        photoUrl: string
        gender: string
        address: string
        role: string
        phone: string
        about: string
        skills: string
    }
}

export interface IInstructors {
    _id: string
    name: string
    email: string
    photoUrl: string
    gender: string
    address: string
    role: string
    phone: string
    about: string
    skills: string
}