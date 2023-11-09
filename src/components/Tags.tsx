type Props = {
  tagList: string[]
  index: number;
};

function Tags({ tagList, index }: Props) {
  return (
    <div className="flex gap-2">
      {tagList.map((tag) => (
        <p
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
          className="text-xs text-gray-800 bg-gray-300 p-1 rounded-xl px-2"
        >
          {tag}
        </p>
      ))}
    </div>
  );
}

export default Tags;
