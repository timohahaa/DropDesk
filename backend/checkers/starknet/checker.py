import requests

RETRY_COUNT = 10

def check_starknet(wallets):
    url = 'https://starkstats.xyz/api/batchcheck'
    headers = {
        'Content-Type': "application/json",
        'Referer': 'https://starkstats.xyz/batchcheck',
        'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    }
    payload = {
        "data": {
            "wallets": wallets, 
            "isFreshData": True,
        }
    }

    for i in range(RETRY_COUNT):
        try:
            r = requests.post(url=url, headers=headers, json=payload).json()

            processed_wallets = []

            for wallet in r['data']:
                processed_wallets.append({"address": wallet['contract'], "balance": wallet['balance'], "last_transaction": wallet['lastTx']})

            responce = {"data": processed_wallets}
            return responce
        except Exception as e:
            print("Exception occured:")
            print(e)
            continue

    error_resp = {
        "error_msg": "error while fetching starknet data",
    }

    return error_resp
