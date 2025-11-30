import {useCallback, useState} from "react";
import {Alert} from "react-native";
import {API_URL} from "@/constants/api";

export const useTransactions = (userId: any) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0,
    })
    const [loading, setLoading] = useState(true)

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            console.log(data, "sfasdfasddd");
            setTransactions(data);
        } catch (error) {
            console.log(error)
        }
    }, [userId])

    const fetchSummary = useCallback(async ()=> {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
            const data = await response.json()
            console.log(data, "ddasdasdddd");
            setSummary(data)
        } catch (error) {
            console.log(error)
        }
    }, [userId])


    const loadData = useCallback(async ()=> {
        if(!userId) return
        setLoading(true)
        console.log('asdfkjaskdlfja', userId)
        try {
            await Promise.all([fetchTransactions(), fetchSummary()])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [fetchTransactions, fetchSummary, userId])

    const deleteTransaction = async (id: any) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {method: 'DELETE'})
            if(!response.ok) throw new Error('Failed to delete transaction')
            loadData()
            Alert.alert('Success', 'Transaction deleted successfully')
        } catch (error) {
            console.log(error)
            Alert.alert('Failed to delete transaction')
        }
    }

    return {
        transactions,
        summary,
        loading,
        loadData,
        deleteTransaction
    }
}
