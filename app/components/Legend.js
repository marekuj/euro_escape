import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';

const images = {
    food: require('../assets/images/food.png'),
    wood: require('../assets/images/wood.png'),
    coal: require('../assets/images/coal.png'),
    iron: require('../assets/images/iron.png'),
    gold: require('../assets/images/gold.png'),
    bricks: require('../assets/images/bricks.png'),
};

let odd = true;

export class Legend extends React.Component {
    render() {
        return (
            <View style={styles.helpItems}>
                <LegendItem title='Tartak' iron={1} coal={1} bricks={3} gold={2} />
                <LegendItem title='Kopalnia' wood={1} iron={1} bricks={3} gold={2} />
                <LegendItem title='Farma' wood={1} iron={1} food={3} gold={5} />
                <LegendItem title='Cegielnia' wood={1} iron={1} coal={3} gold={2} />
                <LegendItem title='Mennica' wood={1} iron={1} coal={1} bricks={2} gold={5} />
                <LegendItem title='Odlewnia' wood={1} food={1} coal={3} bricks={1} gold={2} />
                <LegendItem title='Stocznia' wood={4} iron={4} coal={4} bricks={4} gold={9} />
                <LegendItem title='Market' wood={4} iron={4} coal={4} bricks={4} gold={9} />
                <LegendItem title='Koszary' wood={5} iron={5} bricks={5} gold={9} />
                <LegendItem title='Osada' wood={9} iron={9} coal={9} bricks={9} gold={9} food={9} />
            </View>
        );
    }
}

class LegendItem extends React.Component {


    render() {
        odd ^= true;
        return (
            <View style={[styles.helpItem, odd ? styles.odd : styles.even]}>
                <View style={styles.helpItemTitleContainer}>
                    <Text style={styles.helpItemTitle}>{this.props.title}</Text>
                </View>
                {this.item('wood', this.props.wood)}
                {this.item('bricks', this.props.bricks)}
                {this.item('iron', this.props.iron)}
                {this.item('coal', this.props.coal)}
                {this.item('food', this.props.food)}
                {this.item('gold', this.props.gold)}
            </View>
        );
    }


    item(name, multiplier = 0) {
        return (
            <View style={styles.helpItemResource}>
                <Text style={styles.helpItemResourceMultiplier}>{multiplier}x</Text>
                <Image style={styles.helpItemResourceImage} source={images[name]} resizeMode='contain' />
            </View>
        );
    }

}
const styles = StyleSheet.create({

    helpItems: {
        backgroundColor: '#fff',
        margin: 10,
        width: 300,
        borderRadius: 10,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#000',
    },
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpItemTitleContainer: {
        width: 38,
    },
    helpItemTitle: {
        fontSize: 8,
        fontWeight: 'bold',
        paddingLeft: 3,
    },
    helpItemResource: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpItemResourceMultiplier: {
        paddingLeft: 15,
        fontSize: 10,
        fontWeight: 'bold',
    },
    helpItemResourceImage: {
        height: 16,
        width: 16,
        margin: 0,
        padding: 0,
    },
    odd: {
        backgroundColor: '#dedede',
        borderRadius: 10,
    },
    even: {
    },
});
