export const slicer = (item: any) => { //change any once done
    console.log(item.content, 'aaaaa');

    if (item.length > 2) {
        item.content = item.content.slice(-2)
    }
    console.log(item.content);
    
    return item;
}