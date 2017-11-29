import { fetchCount } from '../numSignals'

const testData = '{ "TotalRows": 3, "ReturnedRows": 3, "Objects": [{ "key": 1, "count": 100 }, { "key": 2, "count": 200 }, { "key": 3, "count": 356 }], "Error": "" }'

test("Test parsing of counts from response body.", () => {
    let total: Number = fetchCount(testData)
    expect(total).toBe(656)
})