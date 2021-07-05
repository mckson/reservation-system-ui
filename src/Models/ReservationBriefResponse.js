class ReservationBriefResponse {
  constructor(obj) {
    this.id = obj.id;
    this.hotelName = obj.hotelName;
    this.dateIn = new Date(obj.dateIn);
    this.totalNights = obj.totalDays;
    this.totalPrice = obj.totalPrice;
  }
}

export default ReservationBriefResponse;
