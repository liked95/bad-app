
import { useAuthenticatedFetch } from "../hooks"

// let fetchApi = useAuthenticatedFetch()

// export const getPages = async () => {
//     let res = await fetchApi('/api/pages', {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json'
//         }
//     })

//     let data = await res.json()
//     return data
// }

export const headers = {
    "Content-Type": "application/json",
    Accept: 'application/json'
}