const fs = require('fs');

var fetchCustomers = () => {
    try {
        var CustomerString = fs.readFileSync('Customer-data.json')
        return JSON.parse(CustomerString);
    } catch (e) {
        return [];
    }
};

var saveCustomers = (customers) => {
    fs.writeFileSync('Customer-data.json', JSON.stringify(customers));
};

var addCustomer = (Id, Name, Email) => {
    var customers = fetchCustomers();
    var Customer = { Id, Name, Email }

    var duplicateCustomer = customers.filter((Customer) => {
        return Customer.Id === Id;
    });

    if (duplicateCustomer.length === 0) {
        customers.push(Customer);
        saveCustomers(customers);
        return Customer
    }

};

var getAll = () => {
    return fetchCustomers();
};


var getCustomers = (Id) => {

    var Customer = fetchCustomers();

    var getCustomers = Customer.filter((Customer) => {
        return Customer.Id === Id;
    });

    return getCustomers[0]

};


var remove = (Id) => {

    var customers = fetchCustomers();

    var filteredCustomers = customers.filter((Customer) => Customer.Id !== Id);
    console.log(filteredCustomers);
    saveCustomers(filteredCustomers);

    return customers.length !== filteredCustomers.length

};

var update = (Id, Name, Email) => {
    var customers = fetchCustomers();
    var customer = { Id, Name, Email }
    var count;
    for (count = 0; count < customers.length; count++) {
        if (customers[count].Id === Id) {
            customer.Name = Name;
            customer.Email = Email;
            customers[count] = customer;
            saveCustomers(customers);
            return customer;
        }
    }
}

var logCustomer = (Customer) => {
    console.log('--');
    console.log(`Customer ID: ${Customer.Id}`);
    console.log(`Customer Name: ${Customer.Name}`);
    console.log(`Customer Email: ${Customer.Email}`);
};

module.exports = {
    addCustomer,
    getAll,
    remove,
    getCustomers,
    logCustomer,
    update
};