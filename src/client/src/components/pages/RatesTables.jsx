import axios  from "axios";
import {useEffect,useState} from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';

export const RatesTables = () => {
    const [rates, setRates] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/getExchangeRates`);
                setRates(result.data);
            }
            catch (error) {
                console.error(error);
            }

        };
        fetchData();
    }, []);
    const usdRates = filterRates(rates, 'USD');
    const eurRates = filterRates(rates, 'EUR');
    return (
        <div >
            <div className="text-center">
                <h1>Exchange Rates</h1>
            </div>
            <div className="d-flex  justify-content-center">
                <div className="m-4">
                    <h2 className="text-center">USD</h2>
                    {usdRates.length > 0 ? TableView(usdRates) : <p>No data</p>}
                </div>
                <div className="m-4">
                    <h2 className="text-center">EUR</h2>
                    {eurRates.length > 0 ? TableView(eurRates) : <p>No data</p>}
                </div>
            </div>
        </div>
    );
}

const TableView = (rates) => {
    return (
        <Table>
            <thead>
            <tr>
                <th>Rate Date</th>
                <th>Currency</th>
                <th>Rate</th>
            </tr>
            </thead>
            <tbody>
            {rates.map((rate) => (
                <tr key={rate.id}>
                    <td>{rate.rate_date}</td>
                    <td>{rate.currency}</td>
                    <td>{rate.rate}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

const filterRates = (rates, currency) => rates.filter(rate => rate.currency === currency);