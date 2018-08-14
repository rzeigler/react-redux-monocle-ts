import { Lens } from 'monocle-ts';

/**
 * Lets look at the following examples:
 * An Address and a Person which contains an Address
 */
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

/**
 * In order to work with redux (as well as general readability) immutability
 * is a desirable trait.
 * However, when we need to update nested fields, it quickly gets tedious.
 */
const updated1: Person = {
  ...original,
  address: {
    ...original.address,
    state: 'GA'
  }
}

/**
 * Lenses are a typesafe first class reference to a field within an object.
 * They are generally defined using a get operation and a set operation although many helpers
 * exist to automate their construction.
 *
 * Here, we define 2 lenses,
 * the first from a Person to an Address,
 * and the second from an Address to a string
 */
const address: Lens<Person, Address> = Lens.fromProp<Person , 'address'>('address');
const state: Lens<Address, string> = Lens.fromProp<Address, 'state'>('state');

/**
 * We can now compose these lenses to focus on a nested element of the full structure
 */
const personsState: Lens<Person, string> = address.compose(state);

/**
 * Once we have a lens focusing on an element, we can get it
 */
console.log('the state: ', personsState.get(original));

/**
 * We can set it
 */
const setPersonStateToGA = personsState.set('GA');
console.log('the new person in GA ', setPersonStateToGA(original));


/**
 * Or, we can modify it (a combination of get, run function, then set result)
 */
const lowercasePersonState = personsState.modify(s => s.toLocaleLowerCase());
console.log('the new person with a lowercase state: ', lowercasePersonState(original));