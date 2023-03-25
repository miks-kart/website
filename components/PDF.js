import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// const URL = "";
const URL = "https://miks-kart.ru";

Font.register({
  family: "Rubik",
  fonts: [
    {
      src: URL + "/PFDinDisplayPro-Light.woff",
      fontWeight: 400,
    },
    {
      src: URL + "/PFDinDisplayPro-Bold.ttf",
      fontWeight: 600,
    },
    {
      src: URL + "/PFDinDisplayPro-BoldItalic.ttf",
      fontWeight: 600,
      fontStyle: "italic",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    paddingTop: "6vw",
    paddingBottom: "6vw",
    paddingHorizontal: "9vw",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Rubik",
  },
  heading: {
    fontWeight: 600,
    fontStyle: "italic",
    fontSize: "3.5vw",
    textTransform: "uppercase",
    paddingBottom: "3vw",
  },
  image: { width: "20vw", objectFit: "contain" },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    width: "100%",
    height: "auto",
    paddingBottom: "5vw",
  },
  sectionEnd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  summaryTop: {
    padding: "1.8vw",
    borderTopLeftRadius: "1vw",
    borderTopRightRadius: "1vw",
    border: "0.12vw solid #D9D9D9",
  },
  summaryMiddle: {
    padding: "1.8vw",
    paddingBottom: "0.8vw",
    borderLeft: "0.12vw solid #D9D9D9",
    borderRight: "0.12vw solid #D9D9D9",
  },
  summaryBottom: {
    padding: "1.8vw",
    borderBottomLeftRadius: "1vw",
    borderBottomRightRadius: "1vw",
    border: "0.12vw solid #D9D9D9",
  },
  summaryTotal: {
    marginTop: "4.6vw",
    padding: "1.8vw",
    borderRadius: "1vw",
    border: "0.12vw solid #D50201",
  },
  summaryExtra: {
    padding: "1.8vw",
    border: "0.12vw solid #D9D9D9",
    borderBottom: "none",
  },
});

export default function PDF({
  name,
  data,
  shoppingCart,
  pdf,
  dzhunior,
  sport,
}) {
  const shoppingCartCopy = { ...shoppingCart };
  if (dzhunior) {
    shoppingCartCopy.priceListOptionsJunior = shoppingCartCopy.priceListOptions;
    shoppingCartCopy.priceListOptions = [];
  }
  if (sport) {
    shoppingCartCopy.priceListOptionsSport = shoppingCartCopy.priceListOptions;
    shoppingCartCopy.priceListOptions = [];
  }
  function getTotalPrice() {
    let total = 0;
    for (let category in shoppingCartCopy) {
      if (Array.isArray(shoppingCartCopy[category])) {
        shoppingCartCopy[category].forEach((item) => {
          total += item.price * item.amount;
        });
      } else {
        total += shoppingCartCopy[category]
          ? shoppingCartCopy[category]?.price *
            shoppingCartCopy[category]?.amount
          : 0;
      }
    }
    return total;
  }
  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.image} src={URL + pdf.logo} />
          <Text
            style={{ fontSize: "1.8vw", color: "#8F8F8F", fontWeight: "600" }}
          >
            {new Date()
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, ".")}
          </Text>
        </View>
        <Text style={styles.heading}>
          {pdf.dear}
          <Text style={{ color: "#8F8F8F" }}>{pdf.aya}</Text> {name}
          {pdf.thanks}
        </Text>
        <View
          style={{
            fontSize: "1.8vw",
            paddingBottom: "6vw",
          }}
        >
          <Text style={{ paddingBottom: "1vw", lineHeight: "1.1" }}>
            {pdf.textOne}
          </Text>
          <Text
            style={{
              color: "#D50201",
              fontWeight: "600",
              paddingBottom: "1vw",
            }}
          >
            {pdf.phone}
          </Text>
          <Text style={{ paddingBottom: "1vw" }}>{pdf.textTwo}</Text>
          <Text style={{ color: "#D50201", fontWeight: "600" }}>
            {pdf.email}
          </Text>
        </View>

        <Text
          style={{
            color: "#8F8F8F",
            fontWeight: "600",
            textTransform: "uppercase",
            fontStyle: "italic",
            fontSize: "3vw",
            paddingBottom: "1.5vw",
          }}
        >
          {pdf.order}
        </Text>

        <View
          style={{
            paddingBottom: "3vw",
            borderBottom: "1px",
            borderTop: "1px",
            borderColor: "#D9D9D9",
          }}
        >
          {JSON.stringify(shoppingCartCopy.priceListKarts) !== "[]" &&
            JSON.stringify(shoppingCartCopy.priceListKarts) !== "null" && (
              <>
                <Text
                  style={{
                    fontSize: "1.8vw",
                    fontWeight: "600",
                    paddingBottom: "0.6vw",
                    paddingTop: "3vw",
                  }}
                >
                  {data.summary.kart}
                </Text>
                {(Array.isArray(shoppingCartCopy.priceListKarts)
                  ? shoppingCartCopy.priceListKarts
                  : [shoppingCartCopy.priceListKarts]
                ).map((item) => (
                  <View
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                      paddingTop: "1.2vw",
                    }}
                    key={item.headingSimple}
                  >
                    <Text style={{ fontSize: "1.8vw" }}>
                      {item.headingSimple}{" "}
                      {item.amount > 1 && (
                        <Text
                          style={{ color: "#8F8F8F", fontWeight: "600" }}
                        >{`${item.amount}x`}</Text>
                      )}
                    </Text>
                    <Text style={{ fontSize: "1.8vw", fontWeight: "600" }}>
                      {item.from ? "От " : ""}
                      {`${numberWithCommas(item.price * item.amount)} руб.`}
                    </Text>
                  </View>
                ))}
              </>
            )}

          {JSON.stringify(shoppingCartCopy.priceListEngines) !== "[]" &&
            JSON.stringify(shoppingCartCopy.priceListEngines) !== "null" && (
              <>
                <Text
                  style={{
                    fontSize: "1.8vw",
                    fontWeight: "600",
                    paddingBottom: "0.6vw",
                    paddingTop: "3vw",
                  }}
                >
                  {data.summary.engine}
                </Text>
                {(Array.isArray(shoppingCartCopy.priceListEngines)
                  ? shoppingCartCopy.priceListEngines
                  : [shoppingCartCopy.priceListEngines]
                ).map((item) => (
                  <View
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                      paddingTop: "1.2vw",
                    }}
                    key={item.headingSimple}
                  >
                    <Text style={{ fontSize: "1.8vw" }}>
                      {item.headingSimple}{" "}
                      {item.amount > 1 && (
                        <Text
                          style={{ color: "#8F8F8F", fontWeight: "600" }}
                        >{`${item.amount}x`}</Text>
                      )}
                    </Text>
                    <Text style={{ fontSize: "1.8vw", fontWeight: "600" }}>
                      {item.from ? "От " : ""}
                      {`${numberWithCommas(item.price * item.amount)} руб.`}
                    </Text>
                  </View>
                ))}
              </>
            )}
          {JSON.stringify(shoppingCartCopy.priceListTires) !== "[]" &&
            JSON.stringify(shoppingCartCopy.priceListTires) !== "null" && (
              <>
                <Text
                  style={{
                    fontSize: "1.8vw",
                    fontWeight: "600",
                    paddingBottom: "0.6vw",
                    paddingTop: "3vw",
                  }}
                >
                  {data.summary.tire}
                </Text>
                {(Array.isArray(shoppingCartCopy.priceListTires)
                  ? shoppingCartCopy.priceListTires
                  : [shoppingCartCopy.priceListTires]
                ).map((item) => (
                  <View
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                      paddingTop: "1.2vw",
                    }}
                    key={item.headingSimple}
                  >
                    <Text style={{ fontSize: "1.8vw" }}>
                      {item.headingSimple}{" "}
                      {item.amount > 1 && (
                        <Text
                          style={{ color: "#8F8F8F", fontWeight: "600" }}
                        >{`${item.amount}x`}</Text>
                      )}
                    </Text>
                    <Text style={{ fontSize: "1.8vw", fontWeight: "600" }}>
                      {item.from ? "От " : ""}
                      {`${numberWithCommas(item.price * item.amount)} руб.`}
                    </Text>
                  </View>
                ))}
              </>
            )}
          {(JSON.stringify(shoppingCartCopy.priceListOptionsSport) !== "[]" ||
            JSON.stringify(shoppingCartCopy.priceListOptionsJunior) !==
              "[]") && (
            <>
              <Text
                style={{
                  fontSize: "1.8vw",
                  fontWeight: "600",
                  paddingBottom: "0.6vw",
                  paddingTop: "3vw",
                }}
              >
                {data.summary.extras}
              </Text>
              {shoppingCartCopy.priceListOptionsSport.length > 0 && (
                <>
                  <Text
                    style={{
                      paddingTop: "1.8vw",
                      fontSize: "1.8vw",
                      color: "#8F8F8F",
                      fontWeight: "600",
                    }}
                  >
                    {data.headingExtrasSport}
                  </Text>
                  {(Array.isArray(shoppingCartCopy.priceListOptionsSport)
                    ? shoppingCartCopy.priceListOptionsSport
                    : [shoppingCartCopy.priceListOptionsSport]
                  ).map((item) => (
                    <View
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                        paddingTop: "1.2vw",
                      }}
                      key={item.headingSimple}
                    >
                      <Text style={{ fontSize: "1.8vw" }}>
                        {item.headingSimple}{" "}
                        {item.amount > 1 && (
                          <Text
                            style={{ color: "#8F8F8F", fontWeight: "600" }}
                          >{`${item.amount}x`}</Text>
                        )}
                      </Text>
                      <Text style={{ fontSize: "1.8vw", fontWeight: "600" }}>
                        {item.from ? "От " : ""}
                        {`${numberWithCommas(item.price * item.amount)} руб.`}
                      </Text>
                    </View>
                  ))}
                </>
              )}

              {shoppingCartCopy.priceListOptionsJunior.length > 0 && (
                <>
                  <Text
                    style={{
                      paddingTop: "1.8vw",
                      fontSize: "1.8vw",
                      color: "#8F8F8F",
                      fontWeight: "600",
                    }}
                  >
                    {data.headingExtrasJunior}
                  </Text>
                  {(Array.isArray(shoppingCartCopy.priceListOptionsJunior)
                    ? shoppingCartCopy.priceListOptionsJunior
                    : [shoppingCartCopy.priceListOptionsJunior]
                  ).map((item) => (
                    <View
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                        paddingTop: "1.2vw",
                      }}
                      key={item.headingSimple}
                    >
                      <Text style={{ fontSize: "1.8vw" }}>
                        {item.headingSimple}{" "}
                        {item.amount > 1 && (
                          <Text
                            style={{ color: "#8F8F8F", fontWeight: "600" }}
                          >{`${item.amount}x`}</Text>
                        )}
                      </Text>
                      <Text style={{ fontSize: "1.8vw", fontWeight: "600" }}>
                        {item.from ? "От " : ""}
                        {`${numberWithCommas(item.price * item.amount)} руб.`}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </>
          )}
        </View>

        <View
          style={{
            paddingTop: "3vw",
            paddingBottom: "2.4vw",
            borderBottom: "1px",
            borderColor: "#D9D9D9",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Text style={{ fontSize: "1.8vw" }}>{pdf.total}</Text>
          <Text style={{ fontSize: "3vw", fontWeight: "600" }}>
            {" "}
            {numberWithCommas(getTotalPrice()) + " руб."}
          </Text>
        </View>

        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          style={{
            width: "12vw",
            objectFit: "contain",
            height: "3.6vw",
            marginTop: "6vw",
          }}
          src={URL + pdf.logoGray}
        />

        <View
          style={{
            fontSize: "1.8vw",
            paddingTop: "3vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {pdf.items.map(({ item }) => (
            <View
              key={item.text}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                style={{
                  marginBottom: "1.2vw",
                  width: "2.14vw",
                  objectFit: "contain",
                  height: "1.7vw",
                }}
                src={URL + item.icon}
              />
              <Text style={{ paddingBottom: "0.6vw", fontSize: "1.2vw" }}>
                {item.text}
              </Text>
              <Text style={{ fontWeight: "600", fontSize: "1.8vw" }}>
                {item.link}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
