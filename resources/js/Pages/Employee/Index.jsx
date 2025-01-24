import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import FlashMessage from '@/Components/FlashMessage';

export default function Index({ employees, query, sortColumn, sortDirection }) {
    const [search, setSearch] = useState(query || '');
    const [sort, setSort] = useState({
        column: sortColumn || 'emp_no', // ค่าเริ่มต้นคอลัมน์
        direction: sortDirection || 'asc', // ค่าเริ่มต้นการเรียง
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employee', { search, sort: sort.column, direction: sort.direction });
    };

    const handleSort = (column) => {
        const direction = sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
        setSort({ column, direction });
        router.get('/employee', { search, sort: column, direction });
    };

    const { flash } = usePage().props;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee List</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search employees..."
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>

            <FlashMessage flash={flash} />

            {/* Employee Table */}
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            {[
                                { label: 'ID', key: 'emp_no' },
                                { label: 'First Name', key: 'first_name' },
                                { label: 'Last Name', key: 'last_name' },
                                { label: 'Gender', key: 'gender' },
                                { label: 'Birth Date', key: 'birth_date' },
                            ].map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-3 text-left text-sm font-medium uppercase cursor-pointer"
                                    onClick={() => handleSort(column.key)}
                                >
                                    {column.label}
                                    {sort.column === column.key && (
                                        <span className="ml-2">
                                            {sort.direction === 'asc' ? '▲' : '▼'}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employees.data.map((employee, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-700">{employee.emp_no}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{employee.first_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{employee.last_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {employee.gender === 'M' ? 'Male' : 'Female'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{employee.birth_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
                {employees.links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => router.get(link.url, { search, sort: sort.column, direction: sort.direction })}
                        disabled={!link.url}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                            link.active
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } ${!link.url && 'cursor-not-allowed opacity-50'}`}
                    >
                        {link.label.replace('&laquo; Previous', 'Previous').replace('Next &raquo;', 'Next')}
                    </button>
                ))}
            </div>
        </div>
    );
}
