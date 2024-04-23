interface DateProps {
  required?: boolean;
  label : string
  id: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const DatePicker: React.FC<DateProps> = ({
  required,
  label,
  id,
  value,
  onChange
}) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black ">
          {label}
        </label>
      <input
      required={required}
      className="w-full rounded-lg border-[1.5px] border-accent-200 bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent-400 active:border-accent-400 disabled:cursor-default disabled:bg-whiter"
        type="date"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DatePicker;
