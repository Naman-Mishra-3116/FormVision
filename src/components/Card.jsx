const classApplied = `p-4 border-2 border-slate rounded-md w-[200px] shadow-custom-white
h-[250px] flex flex-col items-center justify-center gap-4 bg-blue-800
shadow-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-15 border-gray-100 
text-white hover:bg-red-700 hover:bg-opacity-20 hover:shadow-custom-black transition-transform
transform hover:scale-[1.05] duration-300 ease-in-out shadow-custom-white`;

const Card = ({ title, onClickCard, image, altText }) => {
  return (
    <div onClick={onClickCard} className={classApplied}>
      <h3 className="text-[25px]">{title}</h3>
    </div>
  );
};

export default Card;
