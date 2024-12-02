export const Button = ({label , onClick}) => {
    return <div >
        <button onClick={onClick} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 justify-center text-center">{ label }</button>
    </div>
}