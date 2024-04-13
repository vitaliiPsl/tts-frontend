import { useState } from 'react'

const Tooltip = ({ message }) => {
	const [visible, setVisible] = useState(false)

	return (
		<span className='relative'>
			{visible && (
				<div className='absolute w-64 bottom-full mb-2 bg-black text-white text-xs rounded p-2'>
					{message}
				</div>
			)}

			<span
				className='ml-2 text-gray-500 cursor-help'
				onMouseOver={() => setVisible(true)}
				onMouseOut={() => setVisible(false)}
			>
				?
			</span>
		</span>
	)
}

export default Tooltip
