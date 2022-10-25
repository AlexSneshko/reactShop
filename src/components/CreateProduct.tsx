import React, { useState } from 'react'
import { IProduct } from '../models'
import axios from 'axios'
import { ErrorMessage } from './ErrorMessage'

// const productData: IProduct = {
//     title: '',
//     price: 13.5,
//     description: 'lorem ipsum set',
//     image: 'https://i.pravatar.cc',
//     category: 'electronic',
//     rating: {
//         rate: 42,
//         count: 10
//     }
// }

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [rate, setRate] = useState('')
    const [count, setCount] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (title.trim().length === 0) {
            setError('Please enter valid title')
            return
        }
        if (description.trim().length === 0) {
            setError('Please enter valid description')
            return
        }
        if (category.trim().length === 0) {
            setError('Please enter valid category')
            return
        }
        if (isNaN(+price)) {
            setError('Please enter valid price')
            return
        } else if (+price < 0) {
            setError('Please enter price >= 0')
            return
        }
        if (isNaN(+rate)) {
            setError('Please enter valid rate')
            return
        } else if (+rate < 0) {
            setError('Please enter rate >= 0')
            return
        }
        if (isNaN(+count)) {
            setError('Please enter valid count')
            return
        } else if (+count < 0) {
            setError('Please enter count >= 0')
            return
        }

        const productData: IProduct = {
            title,
            price: +price,
            description,
            image,
            category,
            rating: {
                rate: +rate,
                count: +count
            }
        }
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)

        onCreate(response.data)
    }

    const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const changePriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value)
    }
    const changeDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }
    const changeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value)
    }
    const changeCategoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value)
    }
    const changeRateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRate(event.target.value)
    }
    const changeCountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(event.target.value)
    }


    return (
        <form onSubmit={submitHandler}>
            <input
                type='text'
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product title...'
                value={title}
                onChange={changeTitleHandler}
            />
            <input
                type='text'
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product price...'
                value={price}
                onChange={changePriceHandler}
            />
            <input
                type='text'
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product description...'
                value={description}
                onChange={changeDescriptionHandler}
            />
            <input
                type='url'
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product image url...'
                value={image}
                onChange={changeImageHandler}
            />
            <input
                type='text'
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product category...'
                value={category}
                onChange={changeCategoryHandler}
            />
            <input
                type='text'
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product rate...'
                value={rate}
                onChange={changeRateHandler}
            />
            <input
                type='text'
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product count...'
                value={count}
                onChange={changeCountHandler}
            />

            {error && <ErrorMessage error={error} />}
            <button type='submit' className='py-2 px-4 border bg-yellow-400'>Create</button>
        </form>
    )
}