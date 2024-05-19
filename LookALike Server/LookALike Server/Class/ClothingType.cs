namespace LookALike_Server.Class
{
    public class ClothingType
    {
        int id;
        String clothing_Type;
        String clothing_Part;
        static List<ClothingType> ClothingType_List = new List<ClothingType>();


        public ClothingType(int id, string clothing_Type, string clothing_Part)
        {
            Id = -1;
            Clothing_Type = clothing_Type;
            Clothing_Part = clothing_Part;
        }

        public ClothingType() { }

        public int Id { get => id; set => id = value; }
        public string Clothing_Type { get => clothing_Type; set => clothing_Type = value; }
        public string Clothing_Part { get => clothing_Part; set => clothing_Part = value; }

        public List<ClothingType> ReadClothingTypes()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadAllClothingTypes();
        }

        public string GetClothingTypeNameById(int id)
        {
            List<ClothingType> AllClothingType = ReadClothingTypes();
            foreach (ClothingType c in AllClothingType)
            {
                if (c.Id == id)
                {
                    return c.clothing_Type;
                }
            }
            return "Not found";
        }
    }
}
