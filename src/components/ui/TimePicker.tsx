interface TimeProps {
    id: string,
    value: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  
  const TimePicker: React.FC<TimeProps> = ({
    id,
    value,
    name,
    onChange
  }) => {
    return (
      <div>
        <input
        className="w-full rounded-sm border-[1.5px] border-accent-200 bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent-400 active:border-accent-400 disabled:cursor-default disabled:bg-whiter"
          type="time"
          id={id}
          value={value}
          name={name}
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default TimePicker;
  