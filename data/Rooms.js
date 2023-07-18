const Products = [
    {
      name: "Lorem ipsum dolor sit amet consectetur",
      image: "https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/330212222_1152303545478212_3525668380470484820_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEghTJolAgTZjjUBLXPWmTcyN6KfzysaBbI3op_PKxoFmpyg69TK-5z27-fYhx7iHC-LxzvMcinWH2NdIQlnS6S&_nc_ohc=aLQNKyhIJlQAX99eE8W&_nc_ht=scontent.fvte2-3.fna&oh=00_AfBDso_Bo0QPlipomEpwwhJLAmGHoo-hVhGbHAlO1gAtYg&oe=64750080",
      type : "2 beds",
      title : "beatiful raft boat" ,
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, iure",
      price: 89,
      numberOfRooms: 3,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur",
      image: "https://scontent.fvte2-1.fna.fbcdn.net/v/t39.30808-6/228957886_1159953724512303_1429449286945557989_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEAfwI3K8OxsrbYp3DaJpHHOwKaYVolv2U7ApphWiW_ZQEAri4PWSvPdA1h_Yoimdn0o_B_EuH9HfNY57jVtQRl&_nc_ohc=b4f3JscIKUkAX8aHDz3&_nc_ht=scontent.fvte2-1.fna&oh=00_AfAshA1QMsS7leUIkaQv5KuFqbvrIqpouFptneKo8u8oKg&oe=64755D9F",
      type : "2 beds",
      title : "beatiful raft boat" ,
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, iure",
      price: 599,
      numberOfRooms: 10,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur",
      image: "https://scontent.fvte2-1.fna.fbcdn.net/v/t39.30808-6/269695490_113950971143032_680780545586511238_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEbUu_zJKk0Tyz3tDG_r94pF0M7ZtUYXFgXQztm1RhcWMYamIl4ZZBeDrLVFWwrGycrGHanxe-2zEOHOOdU383X&_nc_ohc=3oMCfAiWJewAX9RRKMD&_nc_ht=scontent.fvte2-1.fna&oh=00_AfA-UQ_S7hvEnge4JJjcpAY7-eUGm416aoA21fvgWmgYkw&oe=647557DB",
      type : "2 beds",
      title : "beatiful raft boat" ,
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, iure",
      price: 929,
      numberOfRooms: 0,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur",
      image: "https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/343562898_179566958352937_5502282923236921899_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFfeKrq8OmfwL7nwDd7098QbyQuG9b0-J1vJC4b1vT4nSXz8dk9MrMAmhy1_Y7LimBXO5f_pxIqxjVWKZ2y5zaz&_nc_ohc=Pa8PwupwxJwAX_TSPF4&_nc_ht=scontent.fvte2-3.fna&oh=00_AfCwpf_SkbpRY9R6S6p3v_dzZS_SFlgE_DkDRfsHQYBk_w&oe=6474BAC2",
      type : "2 beds",
      title : "beatiful raft boat" ,
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, iure",
      price: 399,
      numberOfRooms: 10,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur",
      image: "https://scontent.fvte2-1.fna.fbcdn.net/v/t39.30808-6/322351909_1799411487100137_8363837026449286201_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFK-XuBiC4roqtelyuhN9qn3XgAWa-3MqDdeABZr7cyoOdqHl8NHiooKDycZO0tLb8ThEq3_z4DwEgjdama-VDr&_nc_ohc=yFkqzjTIZbsAX_YIDLT&_nc_oc=AQkrp8lpMrOAfWvqAlZ-UAFrpISt0KtmMrutjkhCW6Gu9DkyVDOcXojwDh_tVKa6knY&_nc_ht=scontent.fvte2-1.fna&oh=00_AfDV3BoW7Ksx9kCLYuoGAxwzwcJq44LpGzt2s_1oD6CSKg&oe=6474690D",
      type : "2 beds",
      title : "beatiful raft boat" ,
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, iure",
      price: 49,
      numberOfRooms: 7,
    },
    {
      name: "Lorem ipsum dolor sit amet consectetur",
      image: "https://scontent.fvte2-3.fna.fbcdn.net/v/t39.30808-6/347841897_257150940309640_8873838396641878673_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeFKKoE0eqrKBc9hetueVCA12Oo9qARId7fY6j2oBEh3twaQ5emgUB-KOzCzJiyUbosbFvV79ebJ8c-5uI3hGKsv&_nc_ohc=bw5qoULpmOYAX_RVJev&_nc_ht=scontent.fvte2-3.fna&oh=00_AfDgXqpCJbgoHcO3sWLoFdzmBMhpgOlFlOWGM5a6Kawc0w&oe=64754F75",
      type : "2 beds",
      title : "beatiful raft boat" ,
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, iure",
      price: 29,
      numberOfRooms: 0,
    },
  ];
  
  export default Products;