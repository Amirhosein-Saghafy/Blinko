function ProfileImage({ imagePath, active }) {
  return (
    <div className="w-10 h-10 relative">
      <div className="w-3 h-3 rounded-full bg-white absolute top-0 right-0 flex items-center justify-center z-50">
        <div className={`w-2 h-2 ${active ? 'bg-green-400' : 'bg-gray-300'} rounded-full`}></div>
      </div>
      <img src={imagePath} alt="profile" className="w-full h-full rounded-full" />
    </div>
  );
}

export default ProfileImage;
