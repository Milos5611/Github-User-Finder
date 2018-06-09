export default function Enum( obj ) {
    const keysByValue = new Map();
    const EnumLookup = value => keysByValue.get(value);

    for ( const key of Object.keys(obj) ) {
        EnumLookup[ key ] = obj[ key ];
        keysByValue.set(EnumLookup[ key ], key);
    }
    return Object.freeze(EnumLookup);
}


export const nameSplitted = fullName => {
    const lastIndex = fullName.lastIndexOf(" ");
    const firstName = fullName !== "Unknown" ? fullName.substring(0, lastIndex) : "Unknown";
    const lastName = fullName !== "Unknown" ? fullName.substring(lastIndex + 1) : "Unknown";

    return {firstName, lastName};
};
