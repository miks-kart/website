export default function ListItem({ point }) {
  return (
    <li className="pl-4 li">
      <span className="text-xl font-bold whitespace-pre-line md:text-2xl">
        {point.heading}
      </span>
      {point.text && (
        <span className="block pt-2 theme-text li-invisible">{point.text}</span>
      )}
    </li>
  );
}
