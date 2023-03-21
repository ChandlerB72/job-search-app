import {useState, useEffect} from "react"
import axios from "axios"

const useFetch = (endpoint, sleep = 0, query) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const options = {
		method: "GET",
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			"X-RapidAPI-Key": "9955c325f6mshaf80157f821a85fp1f293cjsnad8eaf93b13d",
			"X-RapidAPI-Host": "jsearch.p.rapidapi.com",
		},
		params: {...query},
	}

	const fetchData = async () => {
		await new Promise((r) => setTimeout(r, sleep))
		setIsLoading(true)
		try {
			const response = await axios.request(options)
			setData(response.data.data)
			setIsLoading(false)
		} catch (error) {
			setError(error)
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const refetch = () => {
		setIsLoading(true)
		fetchData()
	}

	return {data, isLoading, error, refetch}
}

export default useFetch
