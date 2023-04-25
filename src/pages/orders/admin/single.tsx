import Container from "@components/container";
// eslint-disable-next-line object-curly-newline
import { Avatar, Button, Divider, List, Segmented, Skeleton } from "antd";
import { useEffect, useState } from "react";

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

function AdminOrdersSingle() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {}
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px"
        }}>
        <Button onClick={onLoadMore}>نمایش بیشتر</Button>
      </div>
    ) : null;
  return (
    <Container title="سفارش :name" backwardUrl="/admin/orders">
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name?.last}</a>}
              />
              <div>15000 تومان</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Divider> مجموع قیمت </Divider>
      550000 تومان
      <Divider> تایین وضعیت سفارش</Divider>
      <Segmented options={["درحال انجام", "انجام شده", "درحال پرداخت"]} />
      <Button className=" mt-10 w-full " size="large" type="primary" ghost>
        ذخیره
      </Button>
    </Container>
  );
}

export default AdminOrdersSingle;