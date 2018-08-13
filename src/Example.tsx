import { Lens } from 'monocle-ts';

interface Address {
  street: string;
  city: string;
  state: string;
}

interface Person {
  name: string;
  address: Address;
}


const original: Person = {
  name: 'Ryan',
  address: {
    street: '1 W Park Blvd',
    city: 'Richardson',
    state: 'TX'
  }
}

const updated1: Person = {
  ...original,
  address: {
    ...original.address,
    state: 'GA'
  }
}

const state: Lens<Address, string> = Lens.fromProp<Address, 'state'>('state');
const address: Lens<Person, Address> = Lens.fromProp<Person , 'address'>('address');

const updated2: Person = address.compose(state).set('GA')(original);
console.log(updated2);