
import React from 'react';

function Table({data}) {
  return <>
    <thead className="text-primary">
      <tr>
        <th>Hostname</th>
        <th>Address</th>
        <th>Status</th>
        <th className="text-center">Options</th>
      </tr>
    </thead>
    <tbody>
      {data.map(item => {
        return <>
          <tr>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>
              {
                item.status === 'online' ? <span className="badge badge-success">{item.status}</span> : <span className="badge badge-danger">{item.status}</span>
              }
            </td>
            <td className="text-center">View</td>
          </tr>
        </>
      })}

    </tbody>
  </>;
}

export default Table;
