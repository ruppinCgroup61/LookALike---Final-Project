namespace LookALike_Server.Class
{
    public class ClothingAd
    {
        int ad_ID;
        double price;
        string address;
        string ad_Status;
        string user_Email;
        string image1;
        string image2;
        string image3;
        static List<ClothingAd> ClothingAdsList = new List<ClothingAd>();

        public ClothingAd(int ad_ID, double price, string address, string ad_Status, string user_Email, string image1, string image2, string image3)
        {
            Ad_ID = -1;
            Price = price;
            Address = address;
            Ad_Status = ad_Status;
            User_Email = user_Email;
            Image1 = image1;
            Image2 = image2;
            Image3 = image3;
        }

        public ClothingAd() { }

        public int Ad_ID { get => ad_ID; set => ad_ID = value; }
        public double Price { get => price; set => price = value; }
        public string Address { get => address; set => address = value; }
        public string Ad_Status { get => ad_Status; set => ad_Status = value; }
        public string User_Email { get => user_Email; set => user_Email = value; }
        public string Image1 { get => image1; set => image1 = value; }
        public string Image2 { get => image2; set => image2 = value; }
        public string Image3 { get => image3; set => image3 = value; }

        public List<ClothingAd> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadClothingAds();
        }
    }
}
