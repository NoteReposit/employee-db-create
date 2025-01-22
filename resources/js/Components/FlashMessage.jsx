// FlashMessage component to display success or error messages.
const FlashMessage = ({ flash }) => {
    if (!flash.success && !flash.error) return null;
    return (
        <div
            className={`${flash.success
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                } mb-4 rounded border p-4`}
        >
            <p>{flash.success || flash.error}</p>
        </div>
    );
};
export default FlashMessage;