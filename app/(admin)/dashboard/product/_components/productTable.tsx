/*
import { FormEvent, useState } from 'react';
import { productContext } from '@/context/productContext';
import { Toast } from '@/app/ui/toast';
import { InputNumber, InputText } from '@/app/ui/form/input';
import { Select } from '@/app/ui/form/select';

export function ProductTable() {
	return (
		<div className="max-w-[900px] mx-auto w-full">
			<h1 className="text-2xl">ProductPage</h1>
			<CreateProductForm />
		</div>
	);
}

export function createProductFormLogic() {
	const { products, createProduct, marks, categories } = productContext();
	const [warningMsg, setWarningMgs] = useState('');
	const resetMsg = () => setWarningMgs('');

	const [form, setForm] = useState({
		name: '',
		price: '',
		code: '',
		description: '',
		categoryId: '',
		markId: '',
	});
	const setDescription = (newValue: string) =>
		setForm((prev) => ({ ...prev, description: newValue }));

	const setCode = (newValue: string) =>
		setForm((prev) => ({ ...prev, code: newValue }));

	const setName = (newValue: string) =>
		setForm((prev) => ({ ...prev, name: newValue }));

	const setPrice = (newValue: string) =>
		setForm((prev) => ({ ...prev, price: newValue }));
	//const [code, setCode] = useState("")
	//const [description, setDescription] = useState("")
	/*
  async function handlerCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    if (name) {
      setWarningMgs("Es necesario asignarle un nombre al producto")
      return
    }
    if (price) {
      setWarningMgs("Es necesario asignarle un precio al producto")
      return
    }

    const mark = formData.get('mark') as string
    if (mark) {
      setWarningMgs("Es necesario seleccionar una marca")
      return
    }

    const category = formData.get('category') as string
    if (!category) {
      setWarningMgs("Es necesario seleccionar una categoria")
      return
    }
    setWarningMgs("")
    const code = formData.get('code') as string
    const description = formData.get('description') as string

    console.log({ name, mark, code, category, description, price })
    //createProduct({ name, markId, photos, code })
  }

	return {
		setName,
		name: form.name,
		code: form.code,
		price: form.price,
		description: form.description,
		setPrice,
		setCode,
		setDescription,
		resetMsg,
		warningMsg,
		setWarningMgs,
	};
}

export function CreateProductForm() {
	const { createProduct, marks, categories } = productContext();

	const {
		name,
		setName,
		price,
		setPrice,
		code,
		setCode,
		description,
		setDescription,
		resetMsg,
		warningMsg,
		setWarningMgs,
	} = createProductFormLogic();

	async function handlerCreateProduct(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		if (name) {
			setWarningMgs('Es necesario asignarle un nombre al producto');
			return;
		}
		if (price) {
			setWarningMgs('Es necesario asignarle un precio al producto');
			return;
		}

		const mark = formData.get('mark') as string;
		if (mark) {
			setWarningMgs('Es necesario seleccionar una marca');
			return;
		}

		const category = formData.get('category') as string;
		if (!category) {
			setWarningMgs('Es necesario seleccionar una categoria');
			return;
		}
		setWarningMgs('');

		console.log({ name, mark, code, category, description, price });
		//createProduct({ name, markId, photos, code })
	}

	return (
		<form
			className="h-full  m-auto grid grid-cols-1 bg-sky-200 p-5 rounded-lg w-[80%] md:grid-cols-2 gap-[5px]"
			onSubmit={handlerCreateProduct}
		>
			<Toast msg={warningMsg} reset={resetMsg} />
			<InputText value={name} name="name" set={setName} placeholder="Nombre" />
			<InputNumber
				value={price}
				name="price"
				set={setPrice}
				placeholder="Precio"
			/>
			<Select required name="mark" selectName="Marca" items={marks} />
			<Select
				required
				name="category"
				selectName="Categoria"
				items={categories}
			/>
			<InputText value={code} name="code" set={setCode} placeholder="Codigo" />
			<InputText
				value={description}
				name="description"
				set={setDescription}
				placeholder="descripcion"
			/>
			<input className="align-middle" type="submit" value="Crear" />
		</form>
	);
}
*/
