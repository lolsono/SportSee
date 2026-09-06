async function ChartServices(startWeek, endWeek) {

    const startDate = startWeek.toISOString().split("T")[0];
    const endDate = endWeek.toISOString().split("T")[0];

    const response = await fetch(
        `/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`
    );

    if (!response.ok) {
        return false;
    }

    return await response.json();
}

export default ChartServices;
