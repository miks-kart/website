export default function BaseItem({ item }) {
  return (
    <div className="flex flex-col">
      {item.image && (
        <img src={item.image} alt={item.heading} className="w-full" />
      )}
      <div className="p-5 h-full bg-[#F7F7F7]">
        <p className="font-bold text-primary-dark">{item.heading}</p>
        <p className="pt-2 theme-text">{item.text}</p>
      </div>
    </div>
  );
}
