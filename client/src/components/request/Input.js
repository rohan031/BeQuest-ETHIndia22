function Input({ label, type, error, register, name }) {
	return (
		<div className="input-form__item">
			<input
				id={name}
				type={type}
				{...register(name)}
				className={`${error ? "error" : ""}`}
				required
			/>
			<label htmlFor={name}>{label}</label>

			<p className="error">{error?.message}</p>
		</div>
	);
}

export default Input;
