import type {Donation} from "~/types/donate";

export default defineEventHandler(async () => {

    const yokassaDonations = await getYoKassaDonations()
    const customDonations = await getCustomDonations()

    const donations = customDonations.concat(yokassaDonations)

    const grouped = donations.reduce((acc, { name, value }) => {
        acc[name] = (acc[name] || 0) + value;
        return acc;
    }, {} as Record<string, number>);

    const top = Object.entries(grouped).map(([name, value]) => ({
        name,
        value
    }));

    return {
        recent: customDonations.slice(0, 20).concat(yokassaDonations),
        top: top
    }
});

async function getYoKassaDonations(): Promise<Donation[]> {
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

    return items
        .filter((p: any) => !p.description)
        .map((p: any) => ({
            name: "Аноним",
            value: Number(p.amount.value),
            currency: p.amount.currency
        }))
}

async function getCustomDonations(): Promise<Donation[]> {
    const data: any = await $fetch('https://s3.zaralx.ru/zaralx_ru/custom_payments.json')

    return data?.items || []
}