import type {Donation} from "~/types/donate";

export default defineEventHandler(async () => {

    const yokassaDonations = await getYoKassaDonations()
    console.log(yokassaDonations)
    return yokassaDonations
});

async function getYoKassaDonations(): Promise<Donation> {
    const shopId = process.env.YOOKASSA_SHOP_ID
    const secretKey = process.env.YOOKASSA_SECRET_KEY

    const data: any = await $fetch('https://api.yookassa.ru/v3/payments', {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64'),
            'Content-Type': 'application/json'
        },
        query: {
            limit: 50
        }
    })

    const items = data?.items || []

    const payments = items
        .filter(p => !p.description)
        .map(p => ({
            name: "Аноним",
            value: Number(p.amount.value),
            currency: p.amount.currency
        }))

    return payments
}