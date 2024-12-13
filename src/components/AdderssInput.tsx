import AddressSearch from "./AddressSearch";

interface Props {
  onAddressSelect: (address: string) => void;
  value: string;
}

function AddressInput({ onAddressSelect, value }: Props) {

  const handleAddressSelect = (address: string) => {
    onAddressSelect(address);
  };

  return (
    <div className="flex gap-4">
      <input
        className="input-base flex-grow w-9/12"
        placeholder="주소를 입력하세요."
        value={value}
        readOnly
      />
      <AddressSearch onAddressSelect={handleAddressSelect}/>
    </div>
  );
}

export default AddressInput;