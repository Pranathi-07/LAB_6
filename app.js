const fs = require('fs');
const yargs = require('yargs');

const customers = require('./notes.js');

const IdOptions = {
    describe: 'ID of customer',
    demand: true,
    alias: 'i'
}

const NameOptions = {
    describe: 'Name of customer',
    demand: true,
    alias: 'n'
}

const EmailOptions = {
    describe: 'Email of customer',
    demand: true,
    alias: 'e'
}

const argv = yargs

    .command('add', 'Add a new customer', {
        Id: IdOptions,
        Name: NameOptions,
        Email: EmailOptions
    })
    .command('list', 'List all customers')
    .command('read', 'Read a customer', {
        Id: IdOptions
    })
    .command('remove', 'Remove a customer', {
        Id: IdOptions
    })
    .command('update', 'Update the customer', {
        Id: IdOptions,
        Name: NameOptions,
        Email: EmailOptions
    })
    .help()
    .argv;

var command = yargs.argv._[0];


if (command === 'add') {
    var customer = customers.addCustomer(argv.Id, argv.Name, argv.Email);
    if (customer) {
        customers.logCustomer(customer);
    } else {
        console.log("Customer already exists");
    }
} else if (command === 'list') {
    var AllCustomers = customers.getAll();
    console.log(`Printing ${AllCustomers.length} customer(s).`);
    AllCustomers.forEach((customer) => {
        customers.logCustomer(customer);
    });
} else if (command === 'read') {
    var customer = customers.getCustomers(argv.Id);
    if (customers) {
        customers.logCustomer(customer);
    } else {
        console.log("Customer not found");
    }
} else if (command === 'remove') {
    var CustomerRemoved = customers.remove(argv.Id);
    var message = CustomerRemoved ? 'Customer was removed' : 'Customer not found';
    console.log(message);
} else if (command === 'update') {
    var CustomerUpdated = customers.update(argv.Id, argv.Name, argv.Email);
    var message = CustomerUpdated ? 'Customer was updated' : 'Customer not found';
    console.log(message);
} else {
    console.log('command Customer recognized');
}