import moment from "moment";

function groupPhotosByDate(album) {
    if (!album) return null
    return album?.reduce(function (a, c) {
        let date = datetimeToDate(c?.mediaMetadata?.creationTime)
        a[date] = a[date] || [];
        a[date].push(c)
        return a;
    }, Object.create(null));
}

function groupByDate(collection) {
    return collection.reduce(function (a, c) {
        let date = datetimeToDate(c.date)
        a[date] = a[date] || [];
        a[date].push(c)
        return a;
    }, Object.create(null));
}

function datetimeToDate(datetime) {
    let date = moment(datetime).format('YYYY-MM-DD')
    return date
}

export {groupPhotosByDate, groupByDate}
