import dayjs from 'dayjs';
import { TokenMapType, ExistingEntryType } from '../types';

const mapGenerator = (async (data: any ) => {
    try {
        const tokenMap = new Map();
        
        data.forEach((content: TokenMapType) => {
            const date = dayjs(content.created_timestamp); // get the date from the content
            const day = date.day(); // get the day of the week
            const dayName = date.format('dddd'); // get the name of the day of the week

            const tokens = content.tokens;
            const totalTokens = tokens.reduce((acc, token) => acc + token.total, 0); // get the total tokens for the day
    
            if (tokenMap.has(day)) { 
                const existingEntry = tokenMap.get(day) as ExistingEntryType; // get the existing entry
                existingEntry.tokens[0].total += totalTokens; // add the total tokens to the existing entry
                existingEntry.count += 1; // increment the count
            } else {
                tokenMap.set(day, { day, dayName, tokens: [{ total: totalTokens }], count: 1 }); // create a new entry
            }
        });

        const tokenArr = [...tokenMap.values()]; // convert the map to an array
        
        return tokenArr
    } catch (err) {
        console.log(err);
    }
})

export default mapGenerator;