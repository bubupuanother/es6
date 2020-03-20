import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from 'axios'

export default function Counter() {
	const [count, setCount] = useState([])
	// const [obj, setObj] = useState({
	// 	name: "小花",
	// 	age: 25
	// })

	// const click = () => setObj({
	// 	...obj,
	// 	name: "小兰",
	// 	age: 26
	// })

	useEffect(() => {
		axios({
			method: 'post',
			url: 'https://bLogs.zdldove.top/Home/Apis/listWithPage'
		})
			.then(res => {
				setData([...data, _.get(res.data, 'reslut.list')])
			})

			return()=>{
				console.log(000)
			}
	}, [])

	return (
		<div>
			<h2>{obj.name}...{obj.age}</h2>
			<button onClick={click}>click</button>
		</div>
	)
}