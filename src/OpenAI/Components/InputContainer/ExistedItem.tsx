import './ExistedItem.css'

interface IExistedItemProps {
    itemKey: string;
    onRemoveItem: (itemKey: string) => void;
}

function ExistedItem({ itemKey, onRemoveItem }: IExistedItemProps) {
    return (
        <div key={itemKey} className="existed-item">
            <div className="display-item">  {itemKey == '\n' ? '↵' : itemKey}</div>
            <div className="remove-item" onClick={() => onRemoveItem(itemKey)} >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"></path>
                </svg>
            </div>
        </div>
    )
}

export default ExistedItem