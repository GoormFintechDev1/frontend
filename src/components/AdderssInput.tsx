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
    <div className="flex gap-3">
      <input
        className="input-base flex-grow"
        placeholder="주소를 입력하세요."
        value={value}
        readOnly
      />
      <AddressSearch onAddressSelect={handleAddressSelect} />
    </div>
  );
}

export default AddressInput;