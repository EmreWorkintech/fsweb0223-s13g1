const db = require('../../../data/db-config');



async function employeesOrderCount() {
    /*
SELECT
    count(o.Id) as OrderCount,
    (FirstName || ' ' || LastName) as EmployeeName
FROM [Employee] as e
LEFT JOIN [Order] as o ON o.EmployeeId = e.Id
GROUP BY EmployeeName
ORDER BY OrderCount DESC;

[
    {
        EmployeeName: "Emre Şahiner",
        OrderCount: 0
    },
    ...
]
*/

    const data = await db("Employee as e")
                            .leftJoin('Order as o', 'e.Id', 'o.EmployeeId')
                            .count('o.Id as OrderCount')
                            .select('FirstName', 'LastName')
                            .groupBy('e.Id')
                            .orderBy('OrderCount', 'desc')

    const result = data.map(item=>{
        return {
            EmployeeName: item.FirstName + " " + item.LastName,
            OrderCount: item.OrderCount
        }
    })

    return result
}


async function employeesOrders() {
    /*
        SELECT
            e.Id,
            e.FirstName,
            e.LastName,
            o.Id as OrderId,
            o.OrderDate
        FROM [Employee] as e
        JOIN [Order] as o ON o.EmployeeId = e.Id
        Order By e.Id;

        [
            {
                EmployeeId: 1,
                EmployeeName: "Emre Şahiner",
                Orders: [
                    {
                        OrderId: 101458,
                        OrderDate: ...
                    },
                    ....
                ]
            },
            {   
                EmployeeId: 10,
                EmployeeName: "Emre Şahiner",
                Orders: []
            },
            ...
        ]
    */
    const data = await db('Employee as e')
                    .leftJoin('Order as o', 'o.EmployeeId', 'e.Id')
                    .select('e.Id',
                        'e.FirstName',
                        'e.LastName',
                        'o.Id as OrderId',
                        'o.OrderDate')
                    .orderBy('e.Id', 'asc')
                    
    let result = data.reduce((acc,employee)=>{
        //yeni bir çalışan order yok
        let oldRecord = acc.find(item=>item.Id == employee.Id);

        if(!oldRecord){ //yeni bir çalışan

            if(!employee.OrderId) {//yeni bir çalışan order yok
                const newEmployee = {
                    "EmployeeName":employee.FirstName + ' ' + employee.LastName,
                    "Id": employee.Id,
                    "Orders": [] 
                }
                acc.push(newEmployee);
                return acc;
            } else { //yeni çalışan order var
                const newEmployee = {
                    "EmployeeName":employee.FirstName + ' ' + employee.LastName,
                    "Id": employee.Id,
                    "Orders": [{
                        "OrderDate": employee.OrderDate,
                        "OrderId": employee.OrderId
                    }] 
                }
                acc.push(newEmployee);
                return acc;
            }

        } else { //eski çalışan yeni order
            const newOrder = {
                "OrderDate": employee.OrderDate,
                "OrderId": employee.OrderId
            }
            oldRecord.Orders.push(newOrder)
            return acc;
        }

    }, [])    
 
    
    return result
}

module.exports = {
    employeesOrderCount,
    employeesOrders,
}