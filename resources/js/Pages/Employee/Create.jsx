import { useForm, usePage } from '@inertiajs/react';

import FlashMessage from '@/Components/FlashMessage';

export default function Create({ departments }) {
    const { data, setData, post, errors } = useForm({
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        hire_date: '',
        dept_no: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/employee'); // ส่งข้อมูลไปยัง `store` method
    };

    const { flash } = usePage().props;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">

                <FlashMessage flash={flash} />

                {/* First Name */}
                <div>
                    <label className="block font-medium">First Name:</label>
                    <input
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block font-medium">Last Name:</label>
                    <input
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                </div>

                {/* Gender */}
                <div>
                    <label className="block font-medium">Gender:</label>
                    <select
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>

                {/* Hire Date */}
                <div>
                    <label className="block font-medium">Hire Date:</label>
                    <input
                        type="date"
                        value={data.hire_date}
                        onChange={(e) => setData('hire_date', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.hire_date && <span className="text-red-500 text-sm">{errors.hire_date}</span>}
                </div>

                {/* Birth Date */}
                <div>
                    <label className="block font-medium">Birth Date:</label>
                    <input
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.hire_date && <span className="text-red-500 text-sm">{errors.hire_date}</span>}
                </div>

                {/* Department */}
                <div>
                    <label className="block font-medium">Department:</label>
                    <select
                        value={data.dept_no}
                        onChange={(e) => setData('dept_no', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.dept_no} value={dept.dept_no}>
                                {dept.dept_name}
                            </option>
                        ))}
                    </select>
                    {errors.dept_no && <span className="text-red-500 text-sm">{errors.dept_no}</span>}
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
}
