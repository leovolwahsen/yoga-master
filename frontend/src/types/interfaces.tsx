export interface OutletContext {
    isDarkMode: boolean;
}

export interface NavbarProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

export interface FooterProps {
    isDarkMode: boolean;
}

export interface ClassItem {
    _id: string;
    name: string;
    image: string;
    availableSeats: number;
    price: number;
    totalEnrolled: number;
}

export interface InstructorInterface {
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