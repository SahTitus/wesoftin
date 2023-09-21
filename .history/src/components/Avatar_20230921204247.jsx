
// eslint-disable-next-line react/prop-types
const Avatar = ({ name, src }) => {
    if (src) {
        return <img src={src} alt={name} className="w-24 h-24 rounded-full mx-auto" />;
    }

    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    return (
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-gray-300 text-xl font-bold">
            {initials}
        </div>
    );
};

export default Avatar;
