export function getCurrentBid(allBids) {
  let currentBid = 0;

  for (let i = 0; i < allBids.length; i++) {
    const obj = allBids[i];
    if (obj.amount > currentBid) {
      currentBid = obj.amount;
    }
  }

  return currentBid;
}
