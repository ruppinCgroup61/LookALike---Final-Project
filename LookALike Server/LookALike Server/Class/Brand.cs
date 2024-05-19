using System.Net;

namespace LookALike_Server.Class
{
    public class Brand
    {
        int id;
        string brandName;
        static List<Brand> BrandList = new List<Brand>();

        public int Id { get => id; set => id = value; }
        public string BrandName { get => brandName; set => brandName = value; }

        public Brand() { }

        public Brand(int id, string brandName)
        {
            Id = -1;
            BrandName = brandName;
        }

        public List<Brand> ReadBrands()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadAllBrands();
        }

        public string GetBrandNameById(int id)
        {
            List<Brand> AllBrand = ReadBrands();
            foreach (Brand brand in AllBrand)
            {
                if (brand.Id == id)
                {
                    return brand.BrandName;
                }
            }
            return "Not found";
        }
    }
}
