import React, { PureComponent } from 'react';
import {
    ResponsiveContainer, PieChart, Pie, Sector, Cell,
} from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

export default class Example extends PureComponent {
    //   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/w6wsrc52/';

    render() {
        return (
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data01} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" label />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}