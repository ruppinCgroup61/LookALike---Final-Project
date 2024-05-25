using System;
using System.Drawing;

namespace LookALike_Server.Class
{
    public class Item
    {
        int item_ID;
        int item_Code;
        String name;
        string image;
        string color_Code;
        string season;
        string size;
        int brand_ID;
        double price;
        bool is_Favorite;
        string status;
        string user_Email;
        int clothingType_ID;

        public Item(int item_ID, int item_Code, string name, string image, string color_Code, string season, string size, int brand_ID, double price, bool is_Favorite, string status, string user_Email, int clothingType_ID)
        {
            Item_ID = -1;
            Item_Code = item_Code;
            Name = name;
            Image = image;
            Color_Code = color_Code;
            Season = season;
            Size = size;
            Brand_ID = brand_ID;
            Price = price;
            Is_Favorite = is_Favorite;
            Status = status;
            User_Email = user_Email;
            ClothingType_ID = clothingType_ID;

        }

        public Item()
        {
        }

        public int Item_ID { get => item_ID; set => item_ID = value; }
        public int Item_Code { get => item_Code; set => item_Code = value; }
        public string Name { get => name; set => name = value; }
        public string Image { get => image; set => image = value; }
        public string Color_Code { get => color_Code; set => color_Code = value; }
        public string Season { get => season; set => season = value; }
        public string Size { get => size; set => size = value; }
        public int Brand_ID { get => brand_ID; set => brand_ID = value; }
        public double Price { get => price; set => price = value; }
        public bool Is_Favorite { get => is_Favorite; set => is_Favorite = value; }
        public string Status { get => status; set => status = value; }
        public string User_Email { get => user_Email; set => user_Email = value; }
        public int ClothingType_ID { get => clothingType_ID; set => clothingType_ID = value; }
        

        public bool Insert()
        {
            DBservices dbs = new DBservices();
            List<Item> AllItems = dbs.ReadItems();
            foreach (Item I in AllItems)
            {

                if (I.item_ID == this.Item_ID && I.user_Email==this.user_Email)
                {
                    return false;
                }
            }
            dbs.Insert(this);
            return true;
        }

        public List<Item> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadItems();
        }

        public int UpdateItem()
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateItem(this);

        }

        public List<Item> GetAllTopItems(string email)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllTop(email);
        }
        
        public List<Item> GetAllBottomItems(string email)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllBottom(email);
        }

        public List<object> GetAllItemsByUser(string email)
        {
            // Read all items
            List<Item> allItems = Read();
            // Create a list to store the filtered items
            List<object> itemsByUser = new List<object>();

            // Assuming Brand and ClothingType have methods to get names by IDs
            Brand brand = new Brand();
            ClothingType clothingType = new ClothingType();

            foreach (Item item in allItems)
            {
                // Filter items by the provided email
                if (item.User_Email == email)
                {
                    // Get brand name and clothing type name using their IDs
                    string brandName = brand.GetBrandNameById(item.Brand_ID);
                    string clothingTypeName = clothingType.GetClothingTypeNameById(item.ClothingType_ID);

                    // Create a new object with the required properties
                    var itemObject = new
                    {
                        item.Item_ID,
                        item.Item_Code,
                        item.Name,
                        item.Image,
                        Clothing_Type = clothingTypeName,
                        item.Color_Code,
                        item.Season,
                        item.Size,
                        Brand = brandName,
                        item.Price,
                        item.Is_Favorite,
                        item.Status,
                        item.User_Email
                    };

                    // Add the object to the list
                    itemsByUser.Add(itemObject);
                }
            }

            // Return the list of items
            return itemsByUser;
        }

    }
}
