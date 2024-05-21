namespace LookALike_Server.Class
{
    public class ClothingAd
    {
        int ad_ID;
        string user_Email;
        int item_ID;
        double price;
        string address;
        string Ad_Status;
        string Condition;
        string item_Image;
        string phone_Number;
        string itemName;
        string clothingType_Name;

        static List<ClothingAd> ClothingAdsList = new List<ClothingAd>();

        public int Ad_ID { get => ad_ID; set => ad_ID = value; }
        public string User_Email { get => user_Email; set => user_Email = value; }
        public int Item_ID { get => item_ID; set => item_ID = value; }
        public double Price { get => price; set => price = value; }
        public string Address { get => address; set => address = value; }
        public string Ad_Status1 { get => Ad_Status; set => Ad_Status = value; }
        public string Condition1 { get => Condition; set => Condition = value; }
        public string Item_Image { get => item_Image; set => item_Image = value; }
        public string Phone_Number { get => phone_Number; set => phone_Number = value; }
        public string ItemName { get => itemName; set => itemName = value; }
        public string ClothingType_Name { get => clothingType_Name; set => clothingType_Name = value; }

        public ClothingAd() { }

        public ClothingAd(int ad_ID, string user_Email, int item_ID, double price, string address, string ad_Status1, string condition1, string item_Image, string phone_Number, string itemName, string clothingType_Name)
        {
            Ad_ID = -1;
            User_Email = user_Email;
            Item_ID = item_ID;
            Price = price;
            Address = address;
            Ad_Status1 = ad_Status1;
            Condition1 = condition1;
            Item_Image = item_Image;
            Phone_Number = phone_Number;
            ItemName = itemName;
            ClothingType_Name = clothingType_Name;
        }

        public List<ClothingAd> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadClothingAds();
        }

        public bool Insert()
        {
            DBservices dbs = new DBservices();
            List<ClothingAd> AllClothingAd = Read();
            foreach (ClothingAd I in AllClothingAd)
            {

                if (I.Item_ID == this.Item_ID && I.User_Email == this.User_Email)
                {
                    return false;
                }
            }
            dbs.Insert(this);
            return true;
        }
    }
}
