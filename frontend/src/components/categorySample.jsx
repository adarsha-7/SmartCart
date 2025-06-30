import {
    Smartphone,
    Shirt,
    Home,
    Sparkles,
    Heart,
    BookOpen,
    Gamepad2,
} from 'lucide-react'

const categories = [
    {
        id: 1,
        name: 'Electronics',
        icon: <Smartphone size={24} />,
        image: 'https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309643.jpg?semt=ais_hybrid&w=740',
    },
    {
        id: 2,
        name: 'Fashion',
        icon: <Shirt size={24} />,
        image: 'https://media.istockphoto.com/id/1367180724/photo/stylish-young-women-in-pastel-outfits-standing-together-fashion-concept-stock-photo.jpg?s=612x612&w=0&k=20&c=o-uxyttHDkuR9nLopGp2rdGirgCRtRLHTY-4sf0AKWM=',
    },
    {
        id: 3,
        name: 'Home & Living',
        icon: <Home size={24} />,
        image: 'https://i.pinimg.com/736x/bf/5b/d6/bf5bd6f5cdf822a07dc4332d69f259c3.jpg',
    },
    {
        id: 4,
        name: 'Beauty',
        icon: <Sparkles size={24} />,
        image: 'https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg',
    },
    {
        id: 5,
        name: 'Sports',
        icon: <Heart size={24} />,
        image: 'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?semt=ais_hybrid&w=740',
    },
    {
        id: 6,
        name: 'Books',
        icon: <BookOpen size={24} />,
        image: 'https://64.media.tumblr.com/2b92119c99a1a1a800cb54eac46e5c31/6b3784805aae9456-ea/s640x960/b44cd5de414229d915a69a9236247c011295ce8e.jpg',
    },
    {
        id: 7,
        name: 'Gaming',
        icon: <Gamepad2 size={24} />,
        image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?cs=srgb&dl=pexels-pixabay-275033.jpg&fm=jpg',
    },
]

export default categories
